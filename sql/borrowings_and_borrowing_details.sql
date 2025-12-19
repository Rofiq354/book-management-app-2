create table borrowings(
	id serial primary key,
	user_id integer not null,
	borrow_date date not null,
	due_date date not null,
	return_date date not null,
	status varchar(20) not null, -- borrowed, returned, late

	constraint fk_borrowings_user
		foreign key (user_id)
		references users(id)
		on update cascade
		on delete restrict
);

create table borrowing_details(
	id serial primary key,
	borrowing_id integer not null,
	book_id integer not null,
	quantity integer not null,

	constraint fk_borrowing_details_borrowings
		foreign key (borrowing_id)
		references borrowings(id)
		on update cascade
		on delete restrict,

	constraint fk_borrowings_details_books
		foreign key (book_id)
		references books(id)
		on update cascade
		on delete restrict
)