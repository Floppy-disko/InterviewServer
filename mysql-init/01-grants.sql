-- Grant permissions to prisma_user in the docker mysql container, permissions needed for Prisma to manage the database schema
GRANT CREATE, DROP, REFERENCES, ALTER ON *.* TO 'prisma_user'@'%';