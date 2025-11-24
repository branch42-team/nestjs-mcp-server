import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesAdminController } from './courses-admin.controller';
import { CoursesUserController } from './courses-user.controller';
import { CoursesService } from './courses.service';
import { CourseEntity } from './entities/course.entity';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { LessonEntity } from './entities/lesson.entity';
import { ModuleEntity } from './entities/module.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourseEntity,
      ModuleEntity,
      LessonEntity,
      EnrollmentEntity,
    ]),
  ],
  controllers: [CoursesAdminController, CoursesUserController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
