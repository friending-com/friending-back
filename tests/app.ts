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
  } catch (err) {
    console.log(err);
  }
});
afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Login Test', () => {
  it('access and refresh', async () => {
    const result = await LoginService.login({
      email: 'rlfehd2013@naver.com',
      name: 'gildong',
      picture: '1',
    });
    expect(result.access).toBeTruthy();
    expect(result.refresh).toBeTruthy();
  });
});

describe('Profile Create Test', () => {
  const noWorkSpace = {
    name: '길동',
    isPublic: true,
    hashTags: ['중앙대학교'],
    email: 'rlfehd2013@naver.com',
    userId: 1,
  };
  const normalData = {
    name: '길동',
    isPublic: true,
    hashTags: ['중앙대학교'],
    email: 'rlfehd2013@naver.com',
    userId: 1,
    workSpace: '프렌딩',
  };

  it('normal Profile', async () => {
    const result = await ProfileService.createProfile(
      normalData as ProfileCreateData
    );
    expect(result.hashTags[0].hashTag).toBe('중앙대학교');
    expect(result.workSpace.hashTag).toBe('프렌딩');
    expect(result.email).toBe('rlfehd2013@naver.com');
    await ProfileService.deleteProfile(result.id);
  });

  it('not workSpace', async () => {
    const result = await ProfileService.createProfile(
      noWorkSpace as ProfileCreateData
    );
    expect(result.hashTags[0].hashTag).toBe('중앙대학교');
    expect(result.email).toBe('rlfehd2013@naver.com');
    await ProfileService.deleteProfile(result.id);
  });

  it('GetALL Profile Test', async () => {
    await Promise.all([
      ProfileService.createProfile(normalData as ProfileCreateData),
      ProfileService.createProfile(noWorkSpace as ProfileCreateData),
    ]);
    const result = await UserService.findAllProfile(1);
    expect(result[0].hashTags[0].hashTag).toBe('중앙대학교');
    expect(result[0].workSpace.hashTag).toBe('프렌딩');
    expect(result[0].email).toBe('rlfehd2013@naver.com');
  });
});
