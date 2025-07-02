import {Body, Controller, Get, Param, Post} from '@nestjs/common'
import {CreateTodoDto} from '../dtos/CreateTodoDto'
import {ITodo} from '../types/ITodo'

@Controller('todos')
export class TodoController {
  @Get(':id')
  getTodoById(@Param('id') id: string): string {
    return `Todo item with ID: ${id}`
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): ITodo {
    console.log('Creating todo with data:', createTodoDto)
    return {
      id: Math.floor(Math.random() * 1000),
      title: createTodoDto.title,
      description: createTodoDto.description,
    }
  }
}
