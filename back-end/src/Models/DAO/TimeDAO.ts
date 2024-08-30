import Time from '../time';
import pool from '../../db';

export default class TimeDAO {

    public async salvar(t: Time): Promise<Time> {
        try {
            const query: string = `INSERT INTO times (time_nome, time_ano_fundacao, time_nome_presidente, time_cor, time_localizacao, time_estadio, time_tecnico) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
            const values = [t.time_nome, t.time_ano_fundacao, t.time_nome_presidente, t.time_cor, t.time_localizacao, t.time_estadio, t.time_tecnico];
            const result = await pool.query(query, values);

            if (result.rows.length > 0) {
                t.id = result.rows[0].id;
                return t;
            } else {
                throw new Error('Falha ao inserir time');
            }
        } catch (error) {
            console.error('Erro ao tentar salvar time:', error);
            throw new Error('Operação de inserção falhou.');
        }
    }

    public async listarTodos(): Promise<Time[]> {
        try {
            const query = `SELECT * FROM times`;
            const result = await pool.query(query);
            const times: Array<Time> = [];
            for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows[i];
                const time = new Time();
                time.id = row.id;
                time.time_nome = row.time_nome;
                time.time_ano_fundacao = row.time_ano_fundacao;
                time.time_nome_presidente = row.time_nome_presidente;
                time.time_cor = row.time_cor;
                time.time_localizacao = row.time_localizacao;
                time.time_estadio = row.time_estadio;
                time.time_tecnico = row.time_tecnico;
                times.push(time);
            }
            return times;
        } catch (error) {
            console.error('Erro ao tentar consultar times:', error);
            throw new Error('Operação de consulta falhou.');
        }
    }

    public async recuperarUm(id: number): Promise<Time | undefined> {
        try {
            const query = `SELECT * FROM times WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);

            if (result.rows.length > 0) {
                const time = new Time();
                time.id = result.rows[0].id;
                time.time_nome = result.rows[0].time_nome;
                time.time_ano_fundacao = result.rows[0].time_ano_fundacao;
                time.time_nome_presidente = result.rows[0].time_nome_presidente;
                time.time_cor = result.rows[0].time_cor;
                time.time_localizacao = result.rows[0].time_localizacao;
                time.time_estadio = result.rows[0].time_estadio;
                time.time_tecnico = result.rows[0].time_tecnico;
                return time;
            } else {
                return undefined;
            }
        } catch (error) {
            console.error(`Erro ao tentar consultar time ${id}:`, error);
            throw new Error('Operação de consulta falhou.');
        }
    }

    public async excluir(t: Time): Promise<boolean> {
        try {
            const query = `DELETE FROM times WHERE id = $1`;
            const values = [t.id];
            const result = await pool.query(query, values);
            if (result.rowCount) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(`Erro ao tentar remover time ${t.id}:`, error);
            throw new Error('Operação de remoção falhou.');
        }
    }

    public async editar(t: Time): Promise<boolean> {
        try {
            const query = `UPDATE times SET time_nome = $2, time_ano_fundacao = $3, time_nome_presidente = $4, time_cor = $5, time_localizacao = $6, time_estadio = $7, time_tecnico = $8 WHERE id = $1`;
            const values = [t.id, t.time_nome, t.time_ano_fundacao, t.time_nome_presidente, t.time_cor, t.time_localizacao, t.time_estadio, t.time_tecnico];
            const result = await pool.query(query, values);
            if (result.rowCount) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(`Erro ao tentar atualizar time ${t.id}:`, error);
            throw new Error('Operação de edição falhou.');
        }
    }
}