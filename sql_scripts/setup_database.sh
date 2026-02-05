#!/bin/bash

# ============================================================
# Bookstack Database Setup Script
# ============================================================
# This script executes all SQL files in the correct order
# Usage: ./setup_database.sh [mysql_user] [mysql_password]
# ============================================================

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
MYSQL_USER="${1:-root}"
MYSQL_PASSWORD="${2}"
SQL_DIR="$(dirname "$0")"

echo "============================================================"
echo "Bookstack Database Setup"
echo "============================================================"
echo ""

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL client not found. Please install MySQL.${NC}"
    exit 1
fi

# Prompt for password if not provided
if [ -z "$MYSQL_PASSWORD" ]; then
    echo -e "${YELLOW}Enter MySQL password for user '$MYSQL_USER':${NC}"
    read -s MYSQL_PASSWORD
    echo ""
fi

# Function to execute SQL file
execute_sql() {
    local file=$1
    local description=$2
    
    echo -e "${YELLOW}▶ Executing: $file${NC}"
    echo "   $description"
    
    if mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < "$SQL_DIR/$file" 2>&1; then
        echo -e "${GREEN}✓ Success${NC}"
        echo ""
        return 0
    else
        echo -e "${RED}❌ Failed to execute $file${NC}"
        echo "Please check the error message above."
        exit 1
    fi
}

# Execute files in order
echo "Starting database setup..."
echo ""

execute_sql "01_create_schema.sql" "Creating database schemas and tables (17 tables)"
execute_sql "02_create_indexes.sql" "Creating performance indexes (17 indexes)"
execute_sql "03_insert_data.sql" "Inserting sample data (14 users, 80+ books)"
execute_sql "04_insert_ratings_supplement.sql" "Adding book ratings (242 ratings)"

# Verification
echo "============================================================"
echo "Verifying Installation..."
echo "============================================================"
echo ""

# Check databases
echo -e "${YELLOW}Checking databases...${NC}"
DB_COUNT=$(mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SHOW DATABASES LIKE 'bookstack'; SHOW DATABASES LIKE 'authorization'; SHOW DATABASES LIKE 'book_db';" | grep -c "bookstack\|authorization\|book_db" || true)

if [ "$DB_COUNT" -eq 3 ]; then
    echo -e "${GREEN}✓ All 3 databases created${NC}"
else
    echo -e "${RED}❌ Expected 3 databases, found $DB_COUNT${NC}"
fi

# Check user count
echo -e "${YELLOW}Checking users...${NC}"
USER_COUNT=$(mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -D authorization -e "SELECT COUNT(*) FROM user_table;" -s -N)
echo -e "${GREEN}✓ Found $USER_COUNT users${NC}"

# Check book count
echo -e "${YELLOW}Checking books...${NC}"
BOOK_COUNT=$(mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -D book_db -e "SELECT COUNT(*) FROM book_table;" -s -N)
echo -e "${GREEN}✓ Found $BOOK_COUNT books${NC}"

# Check ratings
echo -e "${YELLOW}Checking book ratings...${NC}"
UNRATED=$(mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -D bookstack -e "
SELECT COUNT(*) FROM book_db.book_table b
LEFT JOIN bookstack.book_rating r ON b.book_id = r.book_id
GROUP BY b.book_id
HAVING COUNT(r.rating_id) = 0;" -s -N | wc -l)

if [ "$UNRATED" -eq 0 ]; then
    echo -e "${GREEN}✓ All books have ratings${NC}"
else
    echo -e "${YELLOW}⚠ $UNRATED books without ratings${NC}"
fi

echo ""
echo "============================================================"
echo -e "${GREEN}🟢 DATABASE SETUP COMPLETE!${NC}"
echo "============================================================"
echo ""
echo "Next steps:"
echo "1. Start your Spring Boot application"
echo "2. Start your Node.js services"
echo "3. Test login with sample users"
echo ""
echo "Sample login credentials:"
echo "  Member: alicej / (check application for password)"
echo "  Staff:  davidr / (check application for password)"
echo "  Admin:  frankw / (check application for password)"
echo ""
