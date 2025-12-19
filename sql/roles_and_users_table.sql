create table roles(
	id serial primary key,
	name varchar(50) not null
);

create table users (
	id serial primary key,
	name varchar(150) not null,
	email varchar(255) not null unique,
	password text not null,
	role_id integer not null,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp,

	constraint fk_users_role
		foreign key (role_id)
		references roles(id)
		on update cascade
		on delete restrict
)


