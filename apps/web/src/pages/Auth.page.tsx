import { Button } from "@heroui/react";
import { IMaskInput } from 'react-imask'

export function AuthPage() {
    return (
        <>
            <div className="
                max-h-screen max-w-screen 
                w-screen h-screen
            ">
                <div className="
                    flex justify-center
                ">
                    <div className="w-125 h-screen py-3 flex items-center">
                        <div className="p-5 grid gap-7">
                            <div className="font-medium text-3xl w-3/4">Вход</div>
                            <IMaskInput 
                                className="
                                    text-2xl 
                                    px-5 py-3 
                                    border border-zinc-200 
                                    rounded-2xl
                                "
                                mask={"+{7} 000 000 00-00"}
                            />
                            <Button 
                                fullWidth
                                className={`
                                    text-2xl
                                    h-fit py-2
                                `}
                                size="lg"
                            >
                                Продолжить
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}