import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  // 테스트를 하기 전에 실행되는 것
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    // service 란 이름으로 테스트 파일 안에서 moviesService를 사용할 수 있도록 만들어줌.
    service = module.get<MoviesService>(MoviesService);
  });

  // 개별 테스트 (아니 이걸 it shuld be....처럼 만들어버리네 ㅁㅊ...)
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('shuld be 4', () => {
    expect(2 + 3).toEqual(5);
  });

  describe('getAll() test', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne() test', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 999 not found.`);
      }
    });
  });

  describe('deleteOne() test', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toEqual(allMovies - 1);
    });

    it('shuld return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create() test', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;

      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update() test', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, {
        title: 'Updated Test',
      });

      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it('shuld return a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
