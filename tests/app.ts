import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { LoginService } from '../src/services/LoginService';
import { AppDataSource } from '../src/DAO/data-source';
import { ProfileCreateData } from '../src/types/profileData';
import ProfileService from '../src/services/ProfileService';
import { UserService } from '../src/services/UserService';
beforeAll(async () => {
  dotenv.config();
  try {
    await AppDataSource.initialize();
    console.log('연결!');
  } catch (err) {
    console.log(err);
  }
});
afterAll(async () => {
  AppDataSource.destroy();
});

test('Login Test', async () => {
  const result = await LoginService.login({
    email: 'rlfehd2013@naver.com',
    name: 'gildong',
    picture: '1',
  });
  expect(result.access).toBeTruthy();
  expect(result.refresh).toBeTruthy();
});

test('Profile Create Test', async () => {
  const profileData = {
    name: '길동',
    isPublic: true,
    hashTags: ['중앙대학교'],
    email: 'rlfehd2013@naver.com',
    userId: 1,
    workSpace: '프렌딩',
  };
  const result = await ProfileService.createProfile(
    profileData as ProfileCreateData
  );
  expect(result.hashTags[0].hashTag).toBe('중앙대학교');
  expect(result.workSpace.hashTag).toBe('프렌딩');
  expect(result.email).toBe('rlfehd2013@naver.com');
});

test('GetALL Profile Test', async () => {
  const result = await UserService.findAllProfile(1);
  expect(result[0].hashTags[0].hashTag).toBe('중앙대학교');
  expect(result[0].workSpace.hashTag).toBe('프렌딩');
  expect(result[0].email).toBe('rlfehd2013@naver.com');
});
