import jwt from 'jsonwebtoken'
import dotenv from 'dotenv' 
import { TokenPayload } from '../types'

dotenv.config()

export class TokenManager {
	
    public createToken = (payload: TokenPayload): string => {

        const secretKey = process.env.JWT_KEY;
        if (!secretKey) {
          throw new Error("JWT_KEY não está definida nas variáveis de ambiente");
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        return token
    }

	
    public getPayload = (token: string): TokenPayload | null => {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            )

            return payload as TokenPayload
        
        
        
        } catch (error) {
            return null
        }
    }
}
