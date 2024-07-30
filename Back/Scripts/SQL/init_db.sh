export PGUSER=postgres
export PGPASSWORD=postgres

# 1. Create the database
dropdb -f ma_super_loterie
createdb ma_super_loterie

# 2. Create the schema
psql -U postgres -d ma_super_loterie -f ./Scripts/SQL/create_table.sql

# 3. Insert the data
psql -U postgres -d ma_super_loterie -f ./Scripts/SQL/create_role.sql
psql -U postgres -d ma_super_loterie -f ./Scripts/SQL/create_next_game.sql
psql -U postgres -d ma_super_loterie -f ./Scripts/SQL/create_price.sql
psql -U postgres -d ma_super_loterie -f ./Scripts/SQL/create_admin.sql
psql -U postgres -d ma_super_loterie -f ./Scripts/SQL/create_combinations.sql
psql -U postgres -d ma_super_loterie -f ./Scripts/SQL/create_lucky_number.sql