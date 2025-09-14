import { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
    return (
        <div className="md:mx-10 mx-5 my-20">
            {children}
        </div>
    )
}