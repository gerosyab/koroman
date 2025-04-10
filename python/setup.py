from setuptools import setup, find_packages

setup(
    name='koroman',
    version='1.0.0',
    description='Korean Romanizer with pronunciation rules based on 국립국어원 표기법',
    author='Donghe Youn (Daissue)',
    author_email='gerosyab@gmail.com',
    url='https://github.com/gerosyab/koroman',
    packages=find_packages(),
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Intended Audience :: Developers',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Topic :: Text Processing :: Linguistic',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
    python_requires='>=3.6',
    keywords='korean, romanizer, romanization, hangul, transliteration, linguisticskorean romanizer, korean romanization, korean transliteration, korean linguistics, korean romanizer, korean romanization, koroman',
    project_urls={
        'Bug Reports': 'https://github.com/gerosyab/koroman/issues',
        'Source': 'https://github.com/gerosyab/koroman',
    },
)
