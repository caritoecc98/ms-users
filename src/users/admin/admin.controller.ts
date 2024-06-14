import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.services';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('admin')
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('users/:id/schedule')
  getUserSchedule(@Param('id') userId: string) {
    return this.adminService.getUserSchedule(userId);
  }

  @Put('users/:id/schedule')
  updateUserSchedule(@Param('id') userId: string, @Body() scheduleData: any) {
    return this.adminService.updateUserSchedule(userId, scheduleData);
  }
}
