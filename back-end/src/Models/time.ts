export default class Time {

    private _id: number = 0;
    private _time_nome: string = "";
    private _time_ano_fundacao: number = 0;
    private _time_nome_presidente: string = "";
    private _time_cor: string = "";
    private _time_localizacao: string = "";
    private _time_estadio: string = "";
    private _time_tecnico: string = "";
    
    constructor(id?: number,
        time_nome?: string,
        time_ano_fundacao?: number,
        time_nome_presidente?: string,
        time_cor?: string,
        time_localizacao?: string,
        time_estadio?: string,
        time_tecnico?: string
    ) {
        if (id !== undefined) {
            this._id = id;
        }
        if (time_nome !== undefined) {
            this._time_nome = time_nome;
        }
        if (time_ano_fundacao !== undefined) {
            this._time_ano_fundacao = time_ano_fundacao;
        }
        if (time_nome_presidente !== undefined) {
            this._time_nome_presidente = time_nome_presidente;
        }
        if (time_cor !== undefined) {
            this._time_cor = time_cor;
        }
        if (time_localizacao !== undefined) {
            this._time_localizacao = time_localizacao;
        }
        if (time_estadio !== undefined) {
            this._time_estadio = time_estadio;
        }
        if (time_tecnico !== undefined) {
            this._time_tecnico = time_tecnico;
        }
    }



    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get time_nome(): string {
        return this._time_nome;
    }

    public set time_nome(value: string) {
        this._time_nome = value;
    }

    public get time_ano_fundacao(): number {
        return this._time_ano_fundacao;
    }

    public set time_ano_fundacao(value: number) {
        this._time_ano_fundacao = value;
    }

    public get time_nome_presidente(): string {
        return this._time_nome_presidente;
    }

    public set time_nome_presidente(value: string) {
        this._time_nome_presidente = value;
    }

    public get time_cor(): string {
        return this._time_cor;
    }

    public set time_cor(value: string) {
        this._time_cor = value;
    }

    public get time_localizacao(): string {
        return this._time_localizacao;
    }

    public set time_localizacao(value: string) {
        this._time_localizacao = value;
    }

    public get time_estadio(): string {
        return this._time_estadio;
    }

    public set time_estadio(value: string) {
        this._time_estadio = value;
    }

    public get time_tecnico(): string {
        return this._time_tecnico;
    }

    public set time_tecnico(value: string) {
        this._time_tecnico = value;
    }

    public toJSON() {
        return {
            id: this.id,
            time_nome: this.time_nome,
            time_ano_fundacao: this.time_ano_fundacao,
            time_nome_presidente: this.time_nome_presidente,
            time_cor: this.time_cor,
            time_localizacao: this.time_localizacao,
            time_estadio: this.time_estadio,
            time_tecnico: this.time_tecnico
        };

    }
}