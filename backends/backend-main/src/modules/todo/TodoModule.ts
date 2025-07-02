import {Module} from '@nestjs/common'
import {TodoController} from './application/controllers/TodoController'

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [],
  exports: [],
})
export class TodoModule {}
