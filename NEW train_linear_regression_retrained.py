import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

# Load the data
# Use the same file as before
# Note: Adjust the path if needed

df = pd.read_csv('socal2.csv')

# Remove outliers using the IQR method for key numeric columns
def remove_outliers_iqr(df, columns):
    for col in columns:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR
        df = df[(df[col] >= lower) & (df[col] <= upper)]
    return df

# Columns to check for outliers (excluding one-hot/categorical)
outlier_cols = ['price', 'sqft', 'bed', 'bath']
df = remove_outliers_iqr(df, outlier_cols)

# Drop non-numeric, non-useful columns
if 'street' in df.columns:
    df = df.drop(columns=['street'])
if 'image_id' in df.columns:
    df = df.drop(columns=['image_id'])
if 'n_citi' in df.columns:
    df = df.drop(columns=['n_citi'])

# One-hot encode the city column (as before)
df = pd.get_dummies(df, columns=['citi'])

# Define features and target
X = df.drop(columns=['price'])
y = df['price']

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate the model
# R^2 on test set
y_pred = model.predict(X_test)
r2_test = r2_score(y_test, y_pred)
print(f'R^2 score (test): {r2_test:.3f}')

# R^2 on training set
y_train_pred = model.predict(X_train)
r2_train = r2_score(y_train, y_train_pred)
print(f'R^2 score (train): {r2_train:.3f}')

# Print intercept and coefficients
print('Intercept:', model.intercept_)
print('Coefficients:')
for name, coef in zip(X.columns, model.coef_):
    print(f'{name}: {coef}') 
