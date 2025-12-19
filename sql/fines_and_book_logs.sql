create table fines(
	id serial primary key,
	borrowing_id integer not null,
	amount decimal not null,
	paid_at timestamp null,

	constraint fk_fines_borrowing
		foreign key (borrowing_id)
		references borrowings(id)
		on delete restrict
);

create table book_logs(
	id serial primary key,
	book_id integer not null,
	action varchar(50) not null, -- borrow, return, dll
	created_at timestamp default current_timestamp,

	constraint fk_book_logs_book
		foreign key (book_id)
		references books(id)
		on delete restrict
)