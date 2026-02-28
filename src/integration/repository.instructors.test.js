const {RepositoryInstructors} = require('../repositories/repository.instructors')
const { pool } = require('../db');

describe('Interaccion con DB', () => {
  const repo = new RepositoryInstructors();
  let instructore;

  test('Create guarda en DB', async () => {
    const created = await repo.create({name:'Maria',mail:"correo23@gmail.com", phone:"1234567890"});
    instructore = created.id;

    expect(created).toBeTruthy();
    expect(created.name).toBe('Maria');
    expect(created.mail).toBe('correo23@gmail.com');
  });

  test('Edit guarda en DB', async () => {
    const instructor = await repo.editById(4,{ name:'Maria',mail:"correo23@gmail.com", phone:"1234567890"});
    id = instructor.id;

    expect(instructor).toBeTruthy();
    expect(instructor.name).toBe('Maria');
    expect(instructor.mail).toBe('correo23@gmail.com');
  });

  test('Cambia active', async () => {
    const instructoreBefore = await repo.getById(4)
    const instructorAfter = await repo.changeActive(4);
    id = instructoreBefore.id;

    expect(instructorAfter).toBeTruthy();
    expect(instructorAfter.active).toBe(!instructoreBefore.active);
  });

  afterAll(async () => {
    await pool.end();
  })
});