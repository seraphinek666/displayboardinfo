dataSource {
    pooled = true
    driverClassName = "com.mysql.jdbc.Driver"
    username = "test"
    password = "test"
	readOnly = false
}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = false
    cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory'
}
// environment specific settings
environments {
    development {
        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop', 'update',     'validate', ''
            url = "jdbc:mysql://localhost:3306/test"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
			readOnly = false
        }
    }
    test {
        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop', 'update',     'validate', ''
            url = "jdbc:mysql://localhost:3306/test"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
			readOnly = false
        }
    }
    production {
       dataSource {
            dbCreate = "update" // one of 'create', 'create-drop', 'update',     'validate', ''
            url = "jdbc:mysql://localhost:3306/test"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
			readOnly = false
        }
    }
}
