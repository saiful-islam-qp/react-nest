import {IsNotEmpty, IsString, Length} from 'class-validator'

export class CreateTodoDto {
  //   @IsString()
  //   @IsNotEmpty()
  //   @Length(1, 100)
  title: string

  //   @IsString()
  //   @IsNotEmpty()
  //   @Length(1, 500)
  description: string
}
