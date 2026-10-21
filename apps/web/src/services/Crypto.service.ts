import sodium from 'libsodium-wrappers-sumo'

export type KeyPair = {
    publicKey: Uint8Array
    privateKey: Uint8Array
}

export type IdentityKeys = {
    /**
     * X25519 пара ключей — долгоживущий identity-ключ,
     * используется для diffie-hellman при установке сессии (X3DH: DH1, DH2)
     */
    identityKey: KeyPair
    /**
     * Ed25519 пара ключей — подписывает signed pre-key.
     * В Signal подпись делает XEdDSA-преобразование того же ключа,
     * libsodium его не содержит, поэтому берётся отдельная пара (как в Proteus)
     */
    signingKey: KeyPair
}

export type SignedPreKey = {
    id: string
    keyPair: KeyPair
    signature: Uint8Array
}

export type OneTimePreKey = {
    id: string
    keyPair: KeyPair
}

export type StoredKeys = {
    identity: IdentityKeys
    signedPreKey: SignedPreKey
    oneTimePreKeys: OneTimePreKey[]
}

export class CryptoService {
    private readonly dbname = "bnd-crypto";
    private readonly storeName = "keys";
    private readonly oneTimePreKeyStoreKey = "one-time-prekeys";

    private async openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(this.dbname, 1);

            req.onupgradeneeded = () => {
                const db = req.result;

                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName)
                }
            }

            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        })
    }

    private async get<T>(key: string): Promise<T | undefined> {
        const db = await this.openDB();

        try {
            return new Promise((resolve, reject) => {
                const tx = db.transaction(this.storeName, "readonly");
                const req = tx.objectStore(this.storeName).get(key);

                req.onsuccess = () => {
                    resolve(req.result as T | undefined)
                }
                req.onerror = () => reject(req.error)
            })
        } finally {
            db.close();
        }
    }

    private async set<T>(key: string, value: T): Promise<void> {
        const db = await this.openDB();

        try {
            return new Promise<void>((resolve, reject) => {
                const tx = db.transaction(this.storeName, "readwrite")
                tx.objectStore(this.storeName).put(value, key);

                tx.oncomplete = () => resolve();
                tx.onerror = () => reject(tx.error);
                tx.onabort = () => reject(tx.error);
            })
        } finally {
            db.close();
        }
    }

    private async clearStore(): Promise<void> {
        const db = await this.openDB();

        try {
            return new Promise<void>((resolve, reject) => {
                const tx = db.transaction(this.storeName, "readwrite");

                tx.objectStore(this.storeName).clear();

                tx.oncomplete = () => resolve();
                tx.onerror = () => reject(tx.error);
                tx.onabort = () => reject(tx.error);
            })
        } finally {
            db.close();
        }
    }

    private async generateX25519KeyPair(): Promise<KeyPair> {
        await sodium.ready;
        const { publicKey, privateKey } = sodium.crypto_box_keypair();
        return { publicKey, privateKey };
    }

    private async generateEd25519KeyPair(): Promise<KeyPair> {
        await sodium.ready;
        const { publicKey, privateKey } = sodium.crypto_sign_keypair();
        return { publicKey, privateKey };
    }

    async getOrCreateIdentity(): Promise<IdentityKeys> {
        const stored = await this.get<IdentityKeys>("identity");

        if (stored?.identityKey && stored?.signingKey)
            return stored;

        const identity: IdentityKeys = {
            identityKey: await this.generateX25519KeyPair(),
            signingKey: await this.generateEd25519KeyPair(),
        };
        await this.set("identity", identity);

        return identity;
    }

    async createSignedPreKey(
        id: string = crypto.randomUUID()
    ): Promise<SignedPreKey> {
        const identity = await this.getOrCreateIdentity();
        const keyPair = await this.generateX25519KeyPair();

        const signature = sodium.crypto_sign_detached(
            keyPair.publicKey,
            identity.signingKey.privateKey
        );

        const signedPreKey: SignedPreKey = {
            id,
            keyPair,
            signature,
        };

        await this.set(`signed-prekey:${id}`, signedPreKey);

        return signedPreKey;
    }

    async createOneTimePreKeys(count: number): Promise<OneTimePreKey[]> {
        const oneTimePreKeys: OneTimePreKey[] = [];

        for (let i = 0; i < count; i++) {
            oneTimePreKeys.push({
                id: crypto.randomUUID(),
                keyPair: await this.generateX25519KeyPair(),
            });
        }

        await this.set(this.oneTimePreKeyStoreKey, oneTimePreKeys);

        return oneTimePreKeys;
    }

    async getOrCreateOneTimePreKeys(count: number): Promise<OneTimePreKey[]> {
        const stored = await this.get<OneTimePreKey[]>(this.oneTimePreKeyStoreKey);

        if (stored && stored.length > 0)
            return stored;

        return this.createOneTimePreKeys(count);
    }

    async init(batchSize: number = 20): Promise<StoredKeys> {
        const identity = await this.getOrCreateIdentity();
        const signedPreKey = await this.createSignedPreKey();
        const oneTimePreKeys = await this.getOrCreateOneTimePreKeys(batchSize);

        return {
            identity,
            signedPreKey,
            oneTimePreKeys,
        }
    }

    async verifySignedPreKey(
        signedPreKey: SignedPreKey
    ): Promise<boolean> {
        const identity = await this.getOrCreateIdentity();
        await sodium.ready;

        return sodium.crypto_sign_verify_detached(
            signedPreKey.signature,
            signedPreKey.keyPair.publicKey,
            identity.signingKey.publicKey
        );
    }

    async reset(): Promise<StoredKeys> {
        await this.clearStore();
        return this.init();
    }
}
