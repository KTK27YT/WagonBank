// components/NoSSR.js
import { ReactNode, useEffect, useState } from 'react';

interface NoSSRProps {
    children: ReactNode;
}

export default function NoSSR({ children }: NoSSRProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return children;
}