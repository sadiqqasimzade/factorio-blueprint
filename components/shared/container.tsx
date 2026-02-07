import { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
    return (
        <div className="md:mx-10 mx-5 mt-10 mb-4">
            {children}
        </div>
    )
}