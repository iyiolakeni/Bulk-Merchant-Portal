import { Injectable } from "@nestjs/common";
import { Pos } from "./pos.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PosService{
    constructor(
        @InjectRepository(Pos)
        private readonly posRepository: Repository<Pos>
    ){}
}