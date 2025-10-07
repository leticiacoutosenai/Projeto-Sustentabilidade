import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email?: string;
    password?: string;
}

class AuthClienteService {
    async execute({ email, password }: AuthRequest) {

        const cliente = await prismaClient.cliente.findFirst({
            where: {
                email: email
            }
        })

        if (!cliente) {
            throw new Error("Usuário não encontrado");
        }

        const passwordMatch = await compare(password, cliente.password);

        if (!passwordMatch) {
            throw new Error("Usuário ou senha incorretos");
        }

        // Gera token JWT
        const token = sign(
            {
                id: cliente.id,
                name: cliente.name
            },
            'segredo_leticia',
            {
                subject: cliente.id,
                expiresIn: '30d'
            }
        );

        return {
            id: cliente.id,
            name: cliente.name,
            email: cliente.email,
            token
        };
    }
}

export { AuthClienteService };
