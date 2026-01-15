/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: string
}

@Injectable()
export class TasksService {
    //Inclui um constructor para usar o prisma como banco de dados
    constructor (private prisma: PrismaService) {}

    // Utiliza funções que serão criadas pelo Prisma dentro dos métodos
    // Agora não se manipula mais uma lista de tarefas diretmanete
    // O Prisma agora é o responsável por manipular os dados
    findAll() {
        return this.prisma.task.findMany();
    }

    find(id: number) {
        return this.prisma.task.findUnique({
            where: {id},
        });
    }

    create(title: string, description: string) {
        return this.prisma.task.create({
            data: {title, description},
        });
    }

    update(id: number, title?: string, description?: string, completed?: string) {  // As interrogações servem para não haver obrigatoriedade de preencher tal parâmetro
        return this.prisma.task.update({
            where: {id},
            data: {title, description, completed},
        });
    }

    remove(id: number) {
        return this.prisma.task.delete({
            where: {id},
        });
    }
}
