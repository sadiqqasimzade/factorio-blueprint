import { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
    return (
        <div className="mx-10 my-20">
            {children}
        </div>
    )
}