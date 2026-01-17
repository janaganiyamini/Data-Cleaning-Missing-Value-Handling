# Data Cleaning Lab

An interactive web application for learning and practicing data cleaning techniques, specifically designed for students learning data preprocessing and missing value handling.

## Overview

This educational tool helps students understand and apply various data cleaning methods through a hands-on, visual interface. Built for AI & ML internship Task 2: Data Cleaning & Missing Value Handling.

## Features

### 1. File Upload
- Upload CSV datasets
- Drag-and-drop support
- Instant dataset preview

### 2. Missing Value Analysis
- Automatic detection of missing values
- Visual representation with progress bars
- Column type identification (numerical/categorical)
- Statistics dashboard showing:
  - Total rows and columns
  - Missing value counts
  - Missing value percentages per column

### 3. Imputation Methods

**Numerical Columns:**
- Mean Imputation: Replace with average value
- Median Imputation: Replace with middle value (recommended)
- Drop Rows: Remove rows with missing values

**Categorical Columns:**
- Mode Imputation: Replace with most frequent value (recommended)
- Drop Rows: Remove rows with missing values

### 4. Advanced Options
- Column Drop Threshold: Automatically remove columns with too many missing values (configurable 30-100%)

### 5. Before/After Comparison
- Side-by-side comparison of original vs cleaned data
- Quality metrics and improvements
- Data preview
- Download cleaned dataset as CSV

### 6. Educational Content
- Answers to common interview questions:
  - Mean vs Median Imputation
  - When to drop rows
  - Why missing data is harmful
  - What is data leakage
  - What is data quality
- Best practices for data cleaning

## How to Use

1. **Upload Dataset**: Click or drag-and-drop a CSV file
2. **Analyze**: Review missing value statistics and patterns
3. **Configure**: Choose imputation strategies
4. **Review**: Compare before/after results
5. **Download**: Save your cleaned dataset

## Suggested Datasets

- House Prices Dataset
- Medical Appointment No Shows
- Any CSV file with missing values

## Technology Stack

- React + TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Client-side CSV processing (no backend required)

## Key Concepts Covered

- Missing value detection
- Data imputation strategies
- Data quality assessment
- Statistical measures (mean, median, mode)
- Data preprocessing best practices

## Interview Questions Answered

1. **Mean vs Median Imputation**: Mean for normal distributions, median for skewed data or outliers
2. **When to Drop Rows**: When missing values are random, data is abundant, or imputation would introduce bias
3. **Why Missing Data Is Harmful**: Reduces statistical power, introduces bias, affects model performance
4. **Data Leakage**: When information from test set leaks into training data
5. **Data Quality**: Accuracy, completeness, consistency, timeliness, and validity

## Learning Outcomes

Students will gain:
- Hands-on data preprocessing experience
- Understanding of different imputation methods
- Ability to assess data quality
- Knowledge of when to apply different cleaning strategies
- Practical skills for real-world data science projects

## Built For

AI & ML Internship - Task 2: Data Cleaning & Missing Value Handling
