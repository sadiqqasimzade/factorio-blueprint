import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";

export default function PageTransition({ children }: PropsWithChildren) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setIsTransitioning(true);
        };

        const handleRouteChangeComplete = () => {
            setIsTransitioning(false);
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [router]);

    return (
        <div className={`${isTransitioning ? 'page-transition-enter' : 'page-transition-enter-active'}`}>
            {children}
        </div>
    );
}