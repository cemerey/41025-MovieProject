package com.cem.movieapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of OrderHistorySearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class OrderHistorySearchRepositoryMockConfiguration {

    @MockBean
    private OrderHistorySearchRepository mockOrderHistorySearchRepository;

}
