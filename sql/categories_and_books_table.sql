create table categories(
	id serial primary key,
	name varchar(100) not null,
	description text
);

create table books(
	id serial primary key,
	title varchar(255) not null,
	isbn varchar(20) not null,
	author varchar(150) not null,
	publisher varchar(150) not null,
	publication_year integer not null,
	category_id integer not null,
	total_stock integer not null,
	availible_stock integer not null,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP,

	constraint fk_books_category
		foreign key (category_id)
		references categories(id)
		on update cascade
		on delete restrict
)