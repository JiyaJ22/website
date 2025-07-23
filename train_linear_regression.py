import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

# Load the data
df = pd.read_csv('socal2.csv')

# One-hot encode the city column
df = pd.get_dummies(df, columns=['city'])

# Define features and target
X = df.drop(columns=['price'])
y = df['price']

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
print(f'R^2 score: {r2:.3f}')

# Print intercept and coefficients
print('Intercept:', model.intercept_)
print('Coefficients:')
for name, coef in zip(X.columns, model.coef_):
    print(f'{name}: {coef}') 