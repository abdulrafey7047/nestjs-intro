import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as pactum from 'pactum';
import { AuthDto } from "src/auth/dto";


describe('App e2e', () => {

  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();  
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }));
    await app.init();
    await app.listen(3333); 
    
    // db cleanup logic
    prisma = app.get(PrismaService);
    prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  })

  afterAll(() => {
    app.close();
  })

  // Auth module tests
  describe('Auth', () => {

    const dto: AuthDto = {
      email: 'arafey183@gmail.com',
      password: '123'
    }

    describe('Signup', () => {

      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({password: dto.password})
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec() 
          .post('/auth/signup')
          .withBody({email: dto.email})
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should throw if no body provided', () => {
        return pactum
          .spec() 
          .post('/auth/signup') 
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should signup', () => {

        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(HttpStatus.CREATED);
      });
    });

    describe('Signin', () => {

      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({password: dto.password})
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
  
      it('should throw if password empty', () => {
        return pactum
          .spec() 
          .post('/auth/signin')
          .withBody({email: dto.email})
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
  
      it('should throw if no body provided', () => {
        return pactum
          .spec() 
          .post('/auth/signin') 
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should signin', () => {
      return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(HttpStatus.OK)
          .stores('userAccesstoken', 'access_token');
      });
    });
});

  // User module tests
  describe('User', () => {

    describe('Get Me', () => {

      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAccesstoken}'  // the $S syntax is pactum specific, it is how we can get a value of vairavle stored in pactum 
          })
          .expectStatus(HttpStatus.OK);
      })
    });

    describe('Edit User', () => {});
  });

  // Bookmark module tests
  describe('Bookmark', () => {
    describe('Create Bookmark', () => {});
    describe('Get Bookmark', () => {});
    describe('Get Bookmark by id', () => {});
    describe('Edit Bookmark by id', () => {});
    describe('Delete Bookmark by id', () => {});

  });
});
