CREATE TABLE TwoFactor (
	userName varchar(40) PRIMARY KEY NOT NULL,
	secretKey char(16) NULL,
	secretKeyDate datetime NULL,
	enforce2FA bit NOT NULL DEFAULT 1,
	allowUserReset bit NOT NULL DEFAULT 0,
	isRecentlySet AS cast(case when datediff(minute, secretKeyDate, getdate()) <= 90 then 1 else 0 end as bit)
);
