---
week: 3
subject: Data Driven Decision Making
shared: true
tags:
---
# [[Mean]]
average of the sample or population
$$
µ = \frac{ ∑x_i}{ n}
$$

# [[Spread]]
A metric that describes how spread out the values in the data are.

$$
Range = Max - Minimum
$$

Spread can also be understood through sample variance
$$
s^2 = \frac{1}{n - 1} \sum_{i=1}^{n} (x_i - \bar{x})^2
$$
where 
$$ 
\bar{x} = µ ( of the sample )
$$

## Standard deviation
It is a useful tool to check how spread out it is from the mean.

$$
\sigma = \sqrt{ \frac { \sum {(x_i - µ)^2}} {N - 1}}
$$


## Interquartile Range
$$
Q_1 = P_{25} = x_{\left( \frac{n+1}{4} \right)}
$$
$$
Q_1 = \text{Median of the lower half of the data}
$$
$$
Q_3 = P_{75} = x_{\left( \frac{3(n+1)}{4} \right)}
$$
$$
Q_3 = \text{Median of the upper half of the data}
$$
$$
\text{IQR} = Q_3 - Q_1
$$
 IQR allows you to select middle 50% of data.

  [[Median]] is the middle of the all elements in the sample.
  
  If it is even amount of numbers in the sample, take average of the middle two. Else take the middle number of the sample. SAMPLE MUST BE SORTED from lowest to highest

# Graphs
Skewness - The graph is skewed when mean and median are not the same.

To the right if the mean > median

To the left if the mean < median

Skewness is bad as it may imply the data distribution is uneven and very difficult to work with.

# Probability of Events

Probability is the likelihood of an event to occur.

There are multiple types of probability

Marginal probability
$$
P(A) = \frac{\text{Favorable Odds}}{\text{Total Of Posibilities}}
$$
Joint Probability - two events occurring together
$$
P(A \cap B) = P(A \text{ and } B) = P(A) \cdot P(B)
$$
Conditional Probability - How likely it is for Event A to occur given event B occurred.
$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
$$

Sum of all possible marginal possibilities in total has to give 1 as a result.

# Expected Value
Allows to estimate the weighted average of the outcome from all possible outcomes.
$$
\mathbb{E}[X] = \sum_{i=1}^{n} x_i \cdot P(x_i)
$$

# Normal Distribution

$$
f(x) = \frac{1}{\sigma \sqrt{2\pi}} \, e^{ -\frac{(x - \mu)^2}{2\sigma^2} }
$$

**THE MOST IMPORTANT THING IN STATISTICS**
 Allows for many different tests to check likelihood of events happening. Don't remember the formula, NO need.

### z - score

A value for understanding how far away a item in a sample is away from mean.

$$
z = \frac{x-\mu}{\sigma}
$$
**Interpreting Z-scores:**  
• **z = 0** → Value is exactly at the mean  
• **z = +1** → Value is 1 standard deviation above mean  
• **z = -2** → Value is 2 standard deviations below mean  
• **|z| > 3** → Outlier (very unusual value)

# Correlation: Measuring Association

[[Correlation]] measures the strength and direction of a relationship between two variables. It's represented by the correlation coefficient **r**, which ranges from -1 to +1

$$
r = \frac{ \sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y}) }{ \sqrt{ \sum_{i=1}^{n} (x_i - \bar{x})^2 } \cdot \sqrt{ \sum_{i=1}^{n} (y_i - \bar{y})^2 } }
$$