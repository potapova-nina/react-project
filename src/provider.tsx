import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import React from 'react';

import { PropsWithChildren } from "react";


const queryClient = new QueryClient();

export function Provider({ children }: PropsWithChildren){

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}