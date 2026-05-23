# API Overview

## Employee APIs

### Create Employee

POST /employees


### List Employees

GET /employees

Supports:
- pagination
- country filtering
- job title filtering


### Update Employee

PATCH /employees/{id}


### Delete Employee

DELETE /employees/{id}


## Salary Insight APIs

### Country Salary Insights

GET /salary-insights?country=india


### Average Salary By Job Title

GET /salary-insights/job-title-average


### Employee Count By Country

GET /salary-insights/employee-count-by-country


### Employee Count By Job Title

GET /salary-insights/employee-count-by-job-title


### Employment Status Distribution

GET /salary-insights/employment-status-distribution


### Filter Values Metadata API

GET /salary-insights/filter-values
