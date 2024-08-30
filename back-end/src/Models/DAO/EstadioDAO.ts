import Estadio from '../estadio';
import pool from '../../db';

export default class EstadioDAO {

    public async salvar(e: Estadio): Promise<Estadio> {
        try {
            const query: string = `INSERT INTO estadio (estadio_nome, estadio_time_mandante, estadio_inauguracao, estadio_pais, estadio_estado, estadio_cidade, estadio_capacidade, estadio_grama) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
            const values = [e.estadio_nome, e.estadio_time_mandante, e.estadio_inauguracao, e.estadio_pais, e.estadio_estado, e.estadio_cidade, e.estadio_capacidade, e.estadio_grama];
            const result = await pool.query(query, values);

            if (result.rows.length > 0) {
                e.id = result.rows[0].id;
                return e;
            } else {
                throw new Error('Falha ao inserir estadio');
            }
        } catch (error) {
            console.error('Erro ao tentar salvar estadio:', error);
            throw new Error('Operação de inserção falhou.');
        }
    }

    public async listarTodos(): Promise<Estadio[]> {
        try {
            const query = `SELECT * FROM estadio`;
            const result = await pool.query(query);
            const estadios: Array<Estadio> = [];
            for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows[i];
                const estadio = new Estadio();
                estadio.id = row.id;
                estadio.estadio_nome = row.estadio_nome;
                estadio.estadio_time_mandante = row.estadio_time_mandante;
                estadio.estadio_inauguracao = row.estadio_inauguracao;
                estadio.estadio_pais = row.estadio_pais;
                estadio.estadio_estado = row.estadio_estado;
                estadio.estadio_cidade = row.estadio_cidade;
                estadio.estadio_capacidade = row.estadio_capacidade;
                estadio.estadio_grama = row.estadio_grama;
                estadios.push(estadio);
            }
            return estadios;
        } catch (error) {
            console.error('Erro ao tentar consultar estadios:', error);
            throw new Error('Operação de consulta falhou.');
        }
    }

    public async recuperarUm(id: number): Promise<Estadio | undefined> {
        try {
            const query = `SELECT * FROM estadio WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);

            if (result.rows.length > 0) {
                const estadio = new Estadio();
                estadio.id = result.rows[0].id;
                estadio.estadio_nome = result.rows[0].estadio_nome;
                estadio.estadio_time_mandante = result.rows[0].estadio_time_mandante;
                estadio.estadio_inauguracao = result.rows[0].estadio_inauguracao;
                estadio.estadio_pais = result.rows[0].estadio_pais;
                estadio.estadio_estado = result.rows[0].estadio_estado;
                estadio.estadio_cidade = result.rows[0].estadio_cidade;
                estadio.estadio_capacidade = result.rows[0].estadio_capacidade;
                estadio.estadio_grama = result.rows[0].estadio_grama;
                return estadio;
            } else {
                return undefined;
            }
        } catch (error) {
            console.error(`Erro ao tentar consultar estadio ${id}:`, error);
            throw new Error('Operação de consulta falhou.');
        }
    }

    public async excluir(e: Estadio): Promise<boolean> {
        try {
            const query = `DELETE FROM estadio WHERE id = $1`;
            const values = [e.id];
            const result = await pool.query(query, values);
            if (result.rowCount) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(`Erro ao tentar remover estadio ${e.id}:`, error);
            throw new Error('Operação de remoção falhou.');
        }
    }

    public async editar(e: Estadio): Promise<boolean> {
        try {
            const query = `UPDATE estadio SET estadio_nome = $2, estadio_time_mandante = $3, estadio_inauguracao = $4, estadio_pais = $5, estadio_estado = $6, estadio_cidade = $7, estadio_capacidade = $8, estadio_grama = $9 WHERE id = $1`;
            const values = [e.id, e.estadio_nome, e.estadio_time_mandante, e.estadio_inauguracao, e.estadio_pais, e.estadio_estado, e.estadio_cidade, e.estadio_capacidade, e.estadio_grama];

            const result = await pool.query(query, values);
            if (result.rowCount) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(`Erro ao tentar atualizar estadio ${e.id}:`, error);
            throw new Error('Operação de edição falhou.');
        }
    }
}