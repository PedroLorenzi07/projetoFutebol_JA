import { Request, Response } from 'express';
import EstadioDAO from '../Models/DAO/EstadioDAO';
import Estadio from '../Models/estadio';

export default class EstadioController {
    private _estadio: EstadioDAO = new EstadioDAO();

    salvar = async (req: Request, res: Response): Promise<Response> => {
        try {
            const estadio: Estadio = new Estadio();
            estadio.estadio_nome = req.body.estadio_nome;
            estadio.estadio_time_mandante = req.body.estadio_time_mandante;
            estadio.estadio_inauguracao = req.body.estadio_inauguracao;
            estadio.estadio_pais = req.body.estadio_pais;
            estadio.estadio_estado = req.body.estadio_estado;
            estadio.estadio_cidade = req.body.estadio_cidade;
            estadio.estadio_capacidade = req.body.estadio_capacidade;
            estadio.estadio_grama = req.body.estadio_grama;
            const resultado = await this._estadio.salvar(estadio);
            return res.status(200).json(resultado);
        } catch (err) {
            console.error('Erro ao tentar salvar estadio:', err);
            return res.status(500).send({ error: 'Falha ao tentar salvar estadio.' });
        }
    };

    recuperarTodos = async (req: Request, res: Response): Promise<Response> => {
        try {
            const times = await this._estadio.listarTodos();
            return res.status(200).json(times);
        } catch (err) {
            console.error('Erro ao tentar consultar estadios:', err);
            return res.status(500).send({ error: 'Falha ao tentar consultar estadios.' });
        }
    };

    recuperarUm = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = Number(req.params.id);
            const estadio: Estadio | undefined = await this._estadio.recuperarUm(id);
            if (estadio) {
                return res.status(200).json(estadio);
            } else {
                return res.status(404).json({ message: 'Estadio não encontrado' });
            }
        } catch (err) {
            console.error(`Erro ao tentar consultar estadio ${req.params.id}:`, err);
            return res.status(500).send({ error: `Falha ao tentar consultar estadio.` });
        }
    };

    apagar = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = Number(req.params.id);
            const estadio: Estadio | undefined = await this._estadio.recuperarUm(id);
            if (estadio) {
                const resultado = await this._estadio.excluir(estadio);
                if (resultado) {
                    return res.status(200).json({ message: `Estadio de ID ${id} removida` });
                } else {
                    return res.status(500).json({ erro: `Estadio de ID ${id} não removida, ocorreu um erro` });
                }
            } else {
                return res.status(404).json({ message: 'Time não encontrada' });
            }
        } catch (err) {
            console.error(`Erro ao tentar apagar time ${req.params.id}:`, err);
            return res.status(500).send({ error: `Falha ao tentar apagar time.` });
        }
    };

    editar = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);
        const estadio: Estadio | undefined = await this._estadio.recuperarUm(id);
        if (estadio) {
            estadio.estadio_nome = req.body.estadio_nome;
            estadio.estadio_time_mandante = req.body.estadio_time_mandante;
            estadio.estadio_inauguracao = req.body.estadio_inauguracao;
            estadio.estadio_pais = req.body.estadio_pais;
            estadio.estadio_estado = req.body.estadio_estado;
            estadio.estadio_cidade = req.body.estadio_cidade;
            estadio.estadio_capacidade = req.body.estadio_capacidade;
            estadio.estadio_grama = req.body.estadio_grama;
            const resultado = await this._estadio.editar(estadio);
            if (resultado) {
                return res.status(200).json(estadio);
            } else {
                return res.status(500).json({ erro: `Time de ID ${id} não editada, ocorreu um erro` });
            }
        } else {
            return res.status(404).json({ message: 'Time não encontrada' });
        }
    };
}