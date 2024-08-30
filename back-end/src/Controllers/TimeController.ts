import { Request, Response } from 'express';
import TimeDAO from '../Models/DAO/TimeDAO';
import Time from '../Models/time';

export default class TimeController {
    private _time: TimeDAO = new TimeDAO();

    salvar = async (req: Request, res: Response): Promise<Response> => {
        try {
            const time: Time = new Time();
            time.time_nome = req.body.time_nome;
            time.time_ano_fundacao = req.body.time_ano_fundacao;
            time.time_nome_presidente = req.body.time_nome_presidente;
            time.time_cor = req.body.time_cor;
            time.time_localizacao = req.body.time_localizacao;
            time.time_estadio = req.body.time_estadio;
            time.time_tecnico = req.body.time_tecnico;
            const resultado = await this._time.salvar(time);
            return res.status(200).json(resultado);
        } catch (err) {
            console.error('Erro ao tentar salvar time:', err);
            return res.status(500).send({ error: 'Falha ao tentar salvar time.' });
        }
    };

    recuperarTodos = async (req: Request, res: Response): Promise<Response> => {
        try {
            const times = await this._time.listarTodos();
            return res.status(200).json(times);
        } catch (err) {
            console.error('Erro ao tentar consultar times:', err);
            return res.status(500).send({ error: 'Falha ao tentar consultar times.' });
        }
    };

    recuperarUm = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = Number(req.params.id);
            const time: Time | undefined = await this._time.recuperarUm(id);
            if (time) {
                return res.status(200).json(time);
            } else {
                return res.status(404).json({ message: 'Time não encontrada' });
            }
        } catch (err) {
            console.error(`Erro ao tentar consultar time ${req.params.id}:`, err);
            return res.status(500).send({ error: `Falha ao tentar consultar time.` });
        }
    };

    apagar = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = Number(req.params.id);
            const time: Time | undefined = await this._time.recuperarUm(id);
            if (time) {
                const resultado = await this._time.excluir(time);
                if (resultado) {
                    return res.status(200).json({ message: `Time de ID ${id} removida` });
                } else {
                    return res.status(500).json({ erro: `Time de ID ${id} não removida, ocorreu um erro` });
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
        const time: Time | undefined = await this._time.recuperarUm(id);
        if (time) {
            time.time_nome = req.body.time_nome;
            time.time_ano_fundacao = req.body.time_ano_fundacao;
            time.time_nome_presidente = req.body.time_nome_presidente;
            time.time_cor = req.body.time_cor;
            time.time_localizacao = req.body.time_localizacao;
            time.time_estadio = req.body.time_estadio;
            time.time_tecnico = req.body.time_tecnico;
            const resultado = await this._time.editar(time);
            if (resultado) {
                return res.status(200).json(time);
            } else {
                return res.status(500).json({ erro: `Time de ID ${id} não editada, ocorreu um erro` });
            }
        } else {
            return res.status(404).json({ message: 'Time não encontrada' });
        }
    };
}