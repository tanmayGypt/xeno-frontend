import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const fields = [
  { value: 'totalSpent', label: 'Total Spent' },
  { value: 'visitCount', label: 'Visit Count' },
  { value: 'lastVisit', label: 'Last Visit' },
  { value: 'tags', label: 'Tags' }
];

const operators = [
  { value: 'equals', label: 'Equals' },
  { value: 'notEquals', label: 'Not Equals' },
  { value: 'greaterThan', label: 'Greater Than' },
  { value: 'lessThan', label: 'Less Than' },
  { value: 'contains', label: 'Contains' },
  { value: 'notContains', label: 'Not Contains' }
];

function SegmentBuilder() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ruleLogic, setRuleLogic] = useState('AND');
  const [rules, setRules] = useState([
    { field: 'totalSpent', operator: 'greaterThan', value: '' }
  ]);
  const [estimatedSize, setEstimatedSize] = useState(null);
  const [loading, setLoading] = useState(false);

  const addRule = () => {
    setRules([...rules, { field: 'totalSpent', operator: 'greaterThan', value: '' }]);
  };

  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index, field, value) => {
    const newRules = [...rules];
    newRules[index][field] = value;
    setRules(newRules);
  };

  const previewSegment = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/segments/preview', {
        rules,
        ruleLogic
      });
      setEstimatedSize(response.data.estimatedSize);
    } catch (error) {
      console.error('Error previewing segment:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSegment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('/api/segments', {
        name,
        description,
        rules,
        ruleLogic
      });
      navigate('/segments');
    } catch (error) {
      console.error('Error saving segment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <form onSubmit={saveSegment} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Segment Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rule Logic</label>
              <div className="mt-1">
                <select
                  value={ruleLogic}
                  onChange={(e) => setRuleLogic(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="AND">All rules must match (AND)</option>
                  <option value="OR">Any rule can match (OR)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Rules</h3>
                <button
                  type="button"
                  onClick={addRule}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                  Add Rule
                </button>
              </div>

              {rules.map((rule, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <select
                    value={rule.field}
                    onChange={(e) => updateRule(index, 'field', e.target.value)}
                    className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {fields.map((field) => (
                      <option key={field.value} value={field.value}>
                        {field.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={rule.operator}
                    onChange={(e) => updateRule(index, 'operator', e.target.value)}
                    className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {operators.map((operator) => (
                      <option key={operator.value} value={operator.value}>
                        {operator.label}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={rule.value}
                    onChange={(e) => updateRule(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => removeRule(index)}
                    className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={previewSegment}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Preview Segment
              </button>

              {estimatedSize !== null && (
                <span className="text-sm text-gray-500">
                  Estimated audience size: {estimatedSize.toLocaleString()} customers
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Segment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SegmentBuilder; 