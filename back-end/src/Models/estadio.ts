export default class Estadio {

    private _id: number = 0;
    private _estadio_nome: string = "";
    private _estadio_time_mandante: string = "";
    private _estadio_inauguracao: string = "";
    private _estadio_pais: string = "";
    private _estadio_estado: string = "";
    private _estadio_cidade: string = "";
    private _estadio_capacidade: number = 0;
    private _estadio_grama: string = "";

    constructor(id?: number,
        estadio_nome?: string,
        estadio_time_mandante?: string,
        estadio_inauguracao?: string,
        estadio_pais?: string,
        estadio_estado?: string,
        estadio_cidade?: string,
        estadio_capacidade?: number,
        estadio_grama?: string

    ) {
        if (id !== undefined) {
            this.id = id;
        }
        if (estadio_nome !== undefined) {
            this._estadio_nome = estadio_nome;
        }
        if (estadio_time_mandante !== undefined) {
            this._estadio_time_mandante = estadio_time_mandante;
        }
        if (estadio_inauguracao !== undefined) {
            this._estadio_inauguracao = estadio_inauguracao;
        }
        if (estadio_pais !== undefined) {
            this._estadio_pais = estadio_pais;
        }
        if (estadio_estado !== undefined) {
            this._estadio_estado = estadio_estado;
        }
        if (estadio_cidade !== undefined) {
            this._estadio_cidade = estadio_cidade;
        }
        if (estadio_capacidade !== undefined) {
            this._estadio_capacidade = estadio_capacidade;
        }
        if (estadio_grama !== undefined) {
            this._estadio_grama = estadio_grama;
        }

    }



    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get estadio_nome(): string {
        return this._estadio_nome;
    }

    public set estadio_nome(value: string) {
        this._estadio_nome = value;
    }

    public get estadio_time_mandante(): string {
        return this._estadio_time_mandante;
    }

    public set estadio_time_mandante(value: string) {
        this._estadio_time_mandante = value;
    }

    public get estadio_inauguracao(): string {
        return this._estadio_inauguracao;
    }

    public set estadio_inauguracao(value: string) {
        this._estadio_inauguracao = value;
    }

    public get estadio_pais(): string {
        return this._estadio_pais;
    }

    public set estadio_pais(value: string) {
        this._estadio_pais = value;
    }

    public get estadio_estado(): string {
        return this._estadio_estado;
    }

    public set estadio_estado(value: string) {
        this._estadio_estado = value;
    }

    public get estadio_cidade(): string {
        return this._estadio_cidade;
    }

    public set estadio_cidade(value: string) {
        this._estadio_cidade = value;
    }

    public get estadio_capacidade(): number {
        return this._estadio_capacidade;
    }

    public set estadio_capacidade(value: number) {
        this._estadio_capacidade = value;
    }

    public get estadio_grama(): string {
        return this._estadio_grama;
    }

    public set estadio_grama(value: string) {
        this._estadio_grama = value;
    }

    public toJSON() {
        return {
            id: this.id,
            estadio_nome: this.estadio_nome,
            estadio_time_mandante: this.estadio_time_mandante,
            estadio_inauguracao: this.estadio_inauguracao,
            estadio_pais: this.estadio_pais,
            estadio_estado: this.estadio_estado,
            estadio_cidade: this.estadio_cidade,
            estadio_capacidade: this.estadio_capacidade,
            estadio_grama: this.estadio_grama
        };

    }

}