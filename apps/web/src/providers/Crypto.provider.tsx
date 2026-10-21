import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { CryptoService, type StoredKeys } from '../services/Crypto.service'

type CryptoContextValue = {
    keys: StoredKeys
    service: CryptoService
}

const CryptoContext = createContext<CryptoContextValue | null>(null)

let sessionService: CryptoService | null = null
let sessionInit: Promise<StoredKeys> | null = null

function getSessionKeys(): Promise<StoredKeys> {
    if (!sessionInit) {
        sessionService = new CryptoService()
        sessionInit = sessionService.init()
        sessionInit.catch(() => {
            sessionInit = null
        })
    }

    return sessionInit
}

export function CryptoProvider({ children }: { children: ReactNode }) {
    const [keys, setKeys] = useState<StoredKeys | null>(null)

    useEffect(() => {
        let cancelled = false

        getSessionKeys()
            .then((sessionKeys) => {
                if (cancelled) return

                setKeys(sessionKeys)
            })
            .catch((error) => {
                if (cancelled) return

                console.error('[CryptoProvider] Error:', error)
            })

        return () => {
            cancelled = true
        }
    }, [])

    if (!keys) return null

    return (
        <CryptoContext.Provider value={{ keys, service: sessionService! }}>
            {children}
        </CryptoContext.Provider>
    )
}

export function useCrypto(): CryptoContextValue {
    const context = useContext(CryptoContext)

    if (!context) {
        throw new Error('useCrypto должен вызываться внутри <CryptoProvider>')
    }

    return context
}
