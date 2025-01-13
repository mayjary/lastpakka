import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button';
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { useRouter } from 'next/router';
import { createLinkToken } from '@/lib/actions/user.actions';
import { User } from "@supabase/supabase-js";


type PlaidLinkProps = {
    user: User; 
    variant: string; 
  };

const PlaidLink = ({ user,variant }: PlaidLinkProps) => {
    const router = useRouter();

    const [token,setToken] = useState('');
    
    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        // await exchangePublicToken({
        //     publicToken: public_token,
        //     user,
        // })

        router.push('/');
    },[user])
    
    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);

            
            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user]);

    const config: PlaidLinkOptions = {
        token,
        onSuccess
      };
    
    const { open, ready } = usePlaidLink(config);

    return ( 
        <>
            {variant === 'primary' ? (
                <Button onClick={() => open()} disabled={!ready}>
                    Link Bank Account
                </Button>
            ): variant === 'ghost' ? (
                <Button>
                    Link Bank Account
                </Button>
            ): (
                <Button>
                    Link Bank Account
                </Button>
            )}
        </>
     );
}
 
export default PlaidLink;