// Some logic before
const sql = `
WITH RECURSIVE OrgHierarchy AS (
    SELECT 
        e.employee_id,
        e.name,
        e.manager_id,
        1 AS level
    FROM 
        employees e
    WHERE 
        e.manager_id IS NULL
    
    UNION ALL
    
    SELECT 
        e.employee_id,
        e.name,
        e.manager_id,
        h.level + 1
    FROM 
        employees e
    JOIN OrgHierarchy h ON e.manager_id = h.employee_id
)
SELECT 
    e.employee_id,
    e.name,
    e.department_id,
    d.department_name,
    o.total_sales,
    o.total_orders,
    h.level AS employee_level,
    RANK() OVER (PARTITION BY e.department_id ORDER BY o.total_sales DESC) AS sales_rank
FROM 
    employees e
JOIN 
    departments d ON e.department_id = d.department_id
LEFT JOIN (
    SELECT 
        o.employee_id,
        SUM(o.sales_amount) AS total_sales,
        COUNT(o.order_id) AS total_orders
    FROM 
        orders o
    GROUP BY 
        o.employee_id
) o ON e.employee_id = o.employee_id
JOIN 
    OrgHierarchy h ON e.employee_id = h.employee_id
WHERE 
    e.hire_date BETWEEN '2020-01-01' AND '2023-12-31'
    AND e.salary > 50000
    AND o.total_sales IS NOT NULL
ORDER BY 
    h.level ASC, 
    sales_rank ASC;
`;

// Some logic after
