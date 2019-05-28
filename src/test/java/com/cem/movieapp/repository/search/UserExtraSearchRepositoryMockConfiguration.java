package com.cem.movieapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of UserExtraSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class UserExtraSearchRepositoryMockConfiguration {

    @MockBean
    private UserExtraSearchRepository mockUserExtraSearchRepository;

}
