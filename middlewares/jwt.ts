import express from 'express'
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { JwtPayload, SignOptions, VerifyErrors } from 'jsonwebtoken'; import cookieParser from 'cookie-parser';

const SECRET_KEY = 'sua_chave_secreta'; // Troque por uma chave segura

// Middleware para proteger rotas
export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido' });
    }
}

// Rota de login de exemplo
export const authRouter = express.Router();

authRouter.use(cookieParser());

authRouter.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    // Substitua por sua lógica de autenticação
    if (username === 'admin' && password === 'senha') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // true em produção com HTTPS
            sameSite: 'lax',
        });
        return res.json({ message: 'Autenticado com sucesso' });
    }
    res.status(401).json({ message: 'Credenciais inválidas' });
});