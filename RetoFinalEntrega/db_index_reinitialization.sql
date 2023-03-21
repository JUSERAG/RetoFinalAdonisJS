truncate table forms restart identity;
truncate table users restart identity cascade;
truncate table types_documents restart identity cascade;
truncate table roles restart identity cascade;
truncate table answers restart identity;
truncate table questions restart identity cascade;

insert into roles (id, name) values (1, 'Administrador');
insert into roles (id, name) values (2, 'Student');
insert into types_documents (id, name) values (1, 'CC');
insert into types_documents (id, name) values (2, 'TI');
