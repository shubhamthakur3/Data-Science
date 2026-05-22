"""
Seed the database with demo data for development.
Usage: python manage.py seed_data
"""

import random
from decimal import Decimal
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.institutes.models import Institute
from apps.courses.models import Course, CourseCategory, SyllabusModule

User = get_user_model()

CATEGORIES = [
    ('Data Science', 'data-science', '📊', 1),
    ('Machine Learning', 'machine-learning', '🤖', 2),
    ('Deep Learning', 'deep-learning', '🧠', 3),
    ('Data Analytics', 'data-analytics', '📈', 4),
    ('Python Programming', 'python-programming', '🐍', 5),
    ('AI & NLP', 'ai-nlp', '💬', 6),
    ('Data Engineering', 'data-engineering', '⚙️', 7),
    ('Business Intelligence', 'business-intelligence', '📋', 8),
]

INSTITUTES = [
    {
        'name': 'DataTech Academy', 'slug': 'datatech-academy',
        'city': 'Bengaluru', 'state': 'Karnataka',
        'short_description': 'Premier Data Science training institute with 95% placement rate.',
        'description': 'DataTech Academy is a leading institute specializing in Data Science, ML, and AI training. With industry-expert trainers and hands-on projects, we have trained 5000+ professionals.',
        'website': 'https://datatechacademy.com', 'established_year': 2018,
        'avg_rating': Decimal('4.9'), 'is_featured': True,
    },
    {
        'name': 'AI Institute India', 'slug': 'ai-institute-india',
        'city': 'Mumbai', 'state': 'Maharashtra',
        'short_description': 'Advanced AI & Machine Learning research-focused training center.',
        'description': 'AI Institute India brings cutting-edge research into practical training. Our courses are designed by PhDs and industry leaders from top tech companies.',
        'website': 'https://aiinstitute.in', 'established_year': 2019,
        'avg_rating': Decimal('4.8'), 'is_featured': True,
    },
    {
        'name': 'Analytics Hub', 'slug': 'analytics-hub',
        'city': 'Hyderabad', 'state': 'Telangana',
        'short_description': 'Practical analytics training with real-world business projects.',
        'description': 'Analytics Hub focuses on practical, business-oriented data analytics training. Our curriculum is co-designed with Fortune 500 companies.',
        'website': 'https://analyticshub.in', 'established_year': 2017,
        'avg_rating': Decimal('4.7'), 'is_featured': True,
    },
    {
        'name': 'Code Institute', 'slug': 'code-institute',
        'city': 'Delhi', 'state': 'Delhi',
        'short_description': 'Coding bootcamp specializing in Python and Data Science.',
        'description': 'Code Institute offers intensive coding bootcamps that transform beginners into job-ready data professionals in just 12 weeks.',
        'website': 'https://codeinstitute.co.in', 'established_year': 2020,
        'avg_rating': Decimal('4.6'), 'is_featured': False,
    },
    {
        'name': 'Neural Academy', 'slug': 'neural-academy',
        'city': 'Pune', 'state': 'Maharashtra',
        'short_description': 'Deep Learning and Neural Networks specialist training.',
        'description': 'Neural Academy is dedicated to deep learning education. With GPU-powered labs and research mentorship, students work on publishable projects.',
        'website': 'https://neuralacademy.com', 'established_year': 2021,
        'avg_rating': Decimal('4.9'), 'is_featured': True,
    },
]

COURSES_DATA = [
    {
        'title': 'Complete Data Science Bootcamp',
        'slug': 'complete-data-science-bootcamp',
        'category_slug': 'data-science',
        'institute_slug': 'datatech-academy',
        'description': 'Master the complete Data Science workflow from data collection to model deployment. This comprehensive bootcamp covers Python, Statistics, Machine Learning, Deep Learning, and deployment on cloud platforms.',
        'short_description': 'Master Python, Statistics, ML, and Data Visualization from scratch.',
        'fees': Decimal('45000'), 'discounted_fees': Decimal('35000'),
        'duration_weeks': 16, 'total_hours': 200, 'difficulty': 'beginner', 'mode': 'online',
        'tools_covered': ['Python', 'SQL', 'Pandas', 'Scikit-learn', 'Tableau', 'Excel', 'Git'],
        'highlights': ['100+ hours of live sessions', '15 real-world projects', 'Interview preparation', 'Lifetime access'],
        'prerequisites': ['Basic computer skills', 'High school mathematics'],
        'learning_outcomes': ['Build ML models from scratch', 'Create data visualizations', 'Deploy models to production'],
        'placement_support': True, 'placement_rate': Decimal('92.5'),
        'avg_rating': Decimal('4.9'), 'total_reviews': 234, 'total_enrollments': 1250,
        'is_featured': True, 'is_trending': True,
        'modules': [
            ('Python Fundamentals', 'Variables, data types, functions, OOP', 20, ['Variables', 'Data Types', 'Functions', 'OOP', 'File I/O']),
            ('Statistics & Probability', 'Descriptive stats, distributions, hypothesis testing', 15, ['Mean/Median/Mode', 'Probability', 'Distributions', 'Hypothesis Testing']),
            ('Data Analysis with Pandas', 'DataFrames, cleaning, EDA', 25, ['DataFrames', 'Data Cleaning', 'EDA', 'GroupBy', 'Merging']),
            ('Machine Learning', 'Supervised and unsupervised algorithms', 40, ['Linear Regression', 'Decision Trees', 'SVM', 'Clustering', 'Ensemble Methods']),
            ('Data Visualization', 'Matplotlib, Seaborn, Tableau', 20, ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau Dashboards']),
            ('Capstone Project', 'End-to-end ML project with deployment', 30, ['Problem Definition', 'Data Pipeline', 'Model Training', 'Deployment']),
        ],
    },
    {
        'title': 'Advanced Machine Learning Masterclass',
        'slug': 'advanced-ml-masterclass',
        'category_slug': 'machine-learning',
        'institute_slug': 'ai-institute-india',
        'description': 'Deep dive into advanced ML algorithms, feature engineering, model optimization, and production ML systems. Build real-world ML pipelines deployed on AWS.',
        'short_description': 'Deep dive into ML algorithms, deep learning, and production deployment.',
        'fees': Decimal('85000'), 'discounted_fees': None,
        'duration_weeks': 24, 'total_hours': 300, 'difficulty': 'advanced', 'mode': 'hybrid',
        'tools_covered': ['TensorFlow', 'PyTorch', 'AWS SageMaker', 'Docker', 'MLflow', 'Kubeflow'],
        'highlights': ['Research paper implementation', 'AWS cloud credits included', 'Industry mentor sessions'],
        'prerequisites': ['Python proficiency', 'Basic ML knowledge', 'Linear algebra'],
        'learning_outcomes': ['Build production ML systems', 'Implement research papers', 'Deploy on cloud'],
        'placement_support': True, 'placement_rate': Decimal('88.0'),
        'avg_rating': Decimal('4.8'), 'total_reviews': 189, 'total_enrollments': 680,
        'is_featured': True, 'is_trending': False,
        'modules': [
            ('Advanced Feature Engineering', 'Feature selection, transformation, and creation', 25, ['Feature Selection', 'PCA', 'Feature Stores']),
            ('Ensemble Methods', 'Bagging, Boosting, Stacking', 30, ['Random Forest', 'XGBoost', 'LightGBM', 'Stacking']),
            ('Deep Learning', 'Neural networks, CNNs, RNNs', 50, ['Neural Networks', 'CNNs', 'RNNs', 'Transformers']),
            ('MLOps', 'CI/CD for ML, monitoring, versioning', 35, ['MLflow', 'Docker', 'CI/CD', 'Monitoring']),
        ],
    },
    {
        'title': 'Data Analytics Professional Certificate',
        'slug': 'data-analytics-professional',
        'category_slug': 'data-analytics',
        'institute_slug': 'analytics-hub',
        'description': 'Become a data-driven professional with hands-on analytics projects using industry-standard tools.',
        'short_description': 'Become a data-driven professional with hands-on analytics projects.',
        'fees': Decimal('35000'), 'discounted_fees': Decimal('28000'),
        'duration_weeks': 12, 'total_hours': 150, 'difficulty': 'intermediate', 'mode': 'online',
        'tools_covered': ['Excel', 'SQL', 'Power BI', 'Python', 'Tableau'],
        'highlights': ['Industry case studies', 'Dashboard portfolio', 'Mock interviews'],
        'prerequisites': ['Basic Excel knowledge'],
        'learning_outcomes': ['Create interactive dashboards', 'Write complex SQL queries', 'Tell stories with data'],
        'placement_support': True, 'placement_rate': Decimal('85.0'),
        'avg_rating': Decimal('4.7'), 'total_reviews': 312, 'total_enrollments': 2100,
        'is_featured': False, 'is_trending': True,
        'modules': [
            ('SQL Mastery', 'Queries, joins, window functions', 30, ['SELECT', 'JOINs', 'Subqueries', 'Window Functions']),
            ('Excel Analytics', 'Advanced formulas, pivot tables', 20, ['VLOOKUP', 'Pivot Tables', 'Power Query']),
            ('Power BI Dashboards', 'Data modeling, DAX, reports', 35, ['Data Modeling', 'DAX', 'Visualizations', 'Publishing']),
        ],
    },
    {
        'title': 'Python for Data Science',
        'slug': 'python-for-data-science',
        'category_slug': 'python-programming',
        'institute_slug': 'code-institute',
        'description': 'Learn Python programming specifically for data science applications, from basics to advanced libraries.',
        'short_description': 'Learn Python programming specifically for data science applications.',
        'fees': Decimal('25000'), 'discounted_fees': Decimal('20000'),
        'duration_weeks': 8, 'total_hours': 100, 'difficulty': 'beginner', 'mode': 'online',
        'tools_covered': ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
        'highlights': ['Beginner-friendly', '50+ coding exercises', 'Certificate included'],
        'prerequisites': ['No prior experience required'],
        'learning_outcomes': ['Write Python confidently', 'Analyze data with Pandas', 'Create visualizations'],
        'placement_support': False, 'placement_rate': None,
        'avg_rating': Decimal('4.6'), 'total_reviews': 456, 'total_enrollments': 3200,
        'is_featured': False, 'is_trending': False,
        'modules': [
            ('Python Basics', 'Syntax, variables, control flow', 15, ['Variables', 'Loops', 'Functions', 'Modules']),
            ('NumPy & Pandas', 'Arrays, DataFrames, data manipulation', 25, ['NumPy Arrays', 'Pandas DataFrames', 'Data Cleaning']),
            ('Visualization', 'Matplotlib and Seaborn', 20, ['Line Charts', 'Bar Charts', 'Heatmaps', 'Styling']),
        ],
    },
    {
        'title': 'Deep Learning & Neural Networks',
        'slug': 'deep-learning-neural-networks',
        'category_slug': 'deep-learning',
        'institute_slug': 'neural-academy',
        'description': 'Master CNNs, RNNs, GANs, Transformers, and modern deep learning research with GPU-powered labs.',
        'short_description': 'Master CNNs, RNNs, GANs, Transformers, and modern DL research.',
        'fees': Decimal('75000'), 'discounted_fees': Decimal('62000'),
        'duration_weeks': 20, 'total_hours': 250, 'difficulty': 'advanced', 'mode': 'offline',
        'tools_covered': ['PyTorch', 'TensorFlow', 'Keras', 'CUDA', 'Hugging Face', 'Weights & Biases'],
        'highlights': ['GPU lab access', 'Research mentorship', 'Paper implementation'],
        'prerequisites': ['Python proficiency', 'Linear algebra', 'Basic ML knowledge'],
        'learning_outcomes': ['Build deep learning models', 'Implement research papers', 'Fine-tune LLMs'],
        'placement_support': True, 'placement_rate': Decimal('90.0'),
        'avg_rating': Decimal('4.9'), 'total_reviews': 98, 'total_enrollments': 340,
        'is_featured': True, 'is_trending': True,
        'modules': [
            ('Neural Network Fundamentals', 'Perceptrons, backpropagation, optimization', 30, ['Perceptrons', 'Backprop', 'SGD', 'Adam']),
            ('Computer Vision (CNNs)', 'Image classification, object detection', 40, ['CNNs', 'ResNet', 'YOLO', 'Transfer Learning']),
            ('NLP & Transformers', 'Attention, BERT, GPT architectures', 45, ['Attention', 'BERT', 'GPT', 'Fine-tuning']),
            ('GANs & Generative AI', 'Image generation, diffusion models', 35, ['GANs', 'VAEs', 'Diffusion Models', 'Stable Diffusion']),
        ],
    },
    {
        'title': 'Business Intelligence with Power BI',
        'slug': 'business-intelligence-power-bi',
        'category_slug': 'business-intelligence',
        'institute_slug': 'analytics-hub',
        'description': 'Create stunning dashboards and reports with Microsoft Power BI for business decision-making.',
        'short_description': 'Create stunning dashboards and reports with Power BI.',
        'fees': Decimal('20000'), 'discounted_fees': Decimal('15000'),
        'duration_weeks': 6, 'total_hours': 60, 'difficulty': 'beginner', 'mode': 'online',
        'tools_covered': ['Power BI', 'DAX', 'SQL', 'Excel'],
        'highlights': ['Quick 6-week program', 'Portfolio of 5 dashboards', 'Microsoft certified prep'],
        'prerequisites': ['Basic Excel knowledge'],
        'learning_outcomes': ['Build interactive dashboards', 'Write DAX formulas', 'Connect multiple data sources'],
        'placement_support': False, 'placement_rate': None,
        'avg_rating': Decimal('4.5'), 'total_reviews': 567, 'total_enrollments': 4500,
        'is_featured': False, 'is_trending': False,
        'modules': [
            ('Power BI Basics', 'Interface, data import, basic visuals', 15, ['Interface', 'Data Import', 'Visuals']),
            ('DAX Formulas', 'Measures, calculated columns', 20, ['Measures', 'CALCULATE', 'Time Intelligence']),
            ('Advanced Dashboards', 'Interactive reports, publishing', 25, ['Bookmarks', 'Drill-through', 'Row-level Security']),
        ],
    },
]


class Command(BaseCommand):
    help = 'Seed the database with demo data for development'

    def handle(self, *args, **kwargs):
        self.stdout.write('[*] Seeding database...\n')

        # Create admin user
        admin, created = User.objects.get_or_create(
            email='admin@datascipro.com',
            defaults={
                'first_name': 'Admin', 'last_name': 'User',
                'role': 'admin', 'is_staff': True, 'is_superuser': True,
                'is_email_verified': True,
            }
        )
        if created:
            admin.set_password('admin123456')
            admin.save()
            self.stdout.write(self.style.SUCCESS('  [+] Admin user created (admin@datascipro.com / admin123456)'))

        # Create counsellor
        counsellor, created = User.objects.get_or_create(
            email='counsellor@datascipro.com',
            defaults={
                'first_name': 'Sarah', 'last_name': 'Johnson',
                'role': 'counsellor', 'is_email_verified': True, 'phone': '+91 98765 00001',
            }
        )
        if created:
            counsellor.set_password('counsellor123')
            counsellor.save()
            self.stdout.write(self.style.SUCCESS('  [+] Counsellor user created'))

        # Create student
        student, created = User.objects.get_or_create(
            email='student@datascipro.com',
            defaults={
                'first_name': 'Rahul', 'last_name': 'Sharma',
                'role': 'student', 'is_email_verified': True, 'phone': '+91 98765 00002',
                'city': 'Bengaluru', 'state': 'Karnataka',
            }
        )
        if created:
            student.set_password('student123')
            student.save()
            self.stdout.write(self.style.SUCCESS('  [+] Student user created'))

        # Create categories
        categories = {}
        for name, slug, icon, order in CATEGORIES:
            cat, _ = CourseCategory.objects.get_or_create(
                slug=slug, defaults={'name': name, 'icon': icon, 'sort_order': order}
            )
            categories[slug] = cat
        self.stdout.write(self.style.SUCCESS(f'  [+] {len(CATEGORIES)} categories created'))

        # Create institutes
        institutes = {}
        for data in INSTITUTES:
            inst, _ = Institute.objects.get_or_create(
                slug=data['slug'], defaults=data
            )
            institutes[data['slug']] = inst
        self.stdout.write(self.style.SUCCESS(f'  [+] {len(INSTITUTES)} institutes created'))

        # Create courses with syllabus modules
        for course_data in COURSES_DATA:
            modules = course_data.pop('modules')
            cat_slug = course_data.pop('category_slug')
            inst_slug = course_data.pop('institute_slug')

            course, created = Course.objects.get_or_create(
                slug=course_data['slug'],
                defaults={
                    **course_data,
                    'institute': institutes[inst_slug],
                    'category': categories[cat_slug],
                }
            )

            if created:
                for i, (title, desc, hours, topics) in enumerate(modules):
                    SyllabusModule.objects.create(
                        course=course, title=title, description=desc,
                        duration_hours=hours, topics=topics, sort_order=i + 1,
                    )

        self.stdout.write(self.style.SUCCESS(f'  [+] {len(COURSES_DATA)} courses created with syllabus modules'))

        # Update institute course counts
        for inst in Institute.objects.all():
            inst.total_courses = inst.courses.filter(is_active=True).count()
            inst.save(update_fields=['total_courses'])

        self.stdout.write(self.style.SUCCESS('\n[OK] Database seeded successfully!'))
        self.stdout.write(self.style.WARNING('\nDemo Accounts:'))
        self.stdout.write('  Admin:      admin@datascipro.com / admin123456')
        self.stdout.write('  Counsellor: counsellor@datascipro.com / counsellor123')
        self.stdout.write('  Student:    student@datascipro.com / student123')
