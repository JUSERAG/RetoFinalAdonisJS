truncate table forms restart identity;
truncate table users restart identity cascade;
truncate table types_documents restart identity cascade;
truncate table roles restart identity cascade;
truncate table answers restart identity;
truncate table questions restart identity cascade;

insert into roles (name) values ('Administrador');
insert into roles (name) values ('Student');
insert into types_documents (name) values ('CC');
insert into types_documents (name) values ('TI');

select * from forms;