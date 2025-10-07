import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface ClienteRequest {
    name: string,
    email: string,
    password: string
}

class CreateClienteService {
    async execute({ name, email, password }: ClienteRequest) {

        if (!name) {
            throw new Error("Insira o seu nome")
        }

        if (!email) {
            throw new Error("Email incorreto")
        }

        if (!password) {
            throw new Error('Senha é obrigatória')
        }

        if (!validarNome(name)) {
            throw new Error("O seu nome não pode contar caracteres especiais")
        }

        if(!validarEmail(email)) {
            throw new Error("Somente letras (a - z), números (0 - 9) e pontos (.) são permitidos.")
        }

        function validarNome(nome: string): boolean {
            const regex = /^[A-Za-zÀ-ÿ\s]+$/;
            return regex.test(nome);
        }

        function validarEmail(email: string): boolean{
            const regex = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]+$/i;
            return regex.test(email);
        }

        const senhaSegura = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&#./+¨()]{8,}$/;
        if (!senhaSegura.test(password)) {
            throw new Error("A senha deve ter no mínimo 8 caracteres e conter pelo menos uma letra e um número.");
        }

        const clienteAlreadyExists = await prismaClient.cliente.findFirst({
            where: {
                email: email
            }
        })
        if (clienteAlreadyExists) {
            throw new Error("O Cliente já existe, mude seu email")
        }

        const passwordHash = await hash(password, 8)

        const cliente = await prismaClient.cliente.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return cliente
    }
}

export { CreateClienteService }