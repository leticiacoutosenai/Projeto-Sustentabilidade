import { Request, Response } from "express";
import { AuthClienteService } from "../../services/cliente/AuthClienteService";

class AuthClienteController {
    async handle(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const authClienteService = new AuthClienteService();

            const auth = await authClienteService.execute({
                email,
                password
            });

            res.json(auth);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}

export { AuthClienteController };
